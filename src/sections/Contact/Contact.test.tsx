import emailjs from "@emailjs/browser";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Contact from "@/sections/Contact";

jest.mock("@emailjs/browser", () => ({
  __esModule: true,
  default: {
    init: jest.fn(),
    send: jest.fn(),
  },
}));

describe("Contact", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    delete process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    delete process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  });

  it("accepts input values", () => {
    render(<Contact />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Swapnil" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "hi@example.com" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello there" } });

    expect(screen.getByDisplayValue("Swapnil")).toBeInTheDocument();
    expect(screen.getByDisplayValue("hi@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Hello there")).toBeInTheDocument();
  });

  it("renders the small Ko-fi support link below social links", () => {
    render(<Contact />);

    expect(screen.getByText("Enjoyed my work? Fuel my next idea.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Buy me a coffee/i })).toHaveAttribute(
      "href",
      "https://ko-fi.com/swapdroid",
    );
  });

  it("shows validation errors for missing and invalid input", async () => {
    render(<Contact />);

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    expect(await screen.findByText("Please fill all fields")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Swapnil" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "invalid" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByText("Please enter a valid email")).toBeInTheDocument();
  });

  it("shows configuration error when emailjs env vars are missing", async () => {
    render(<Contact />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Swapnil" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "hi@example.com" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(
      await screen.findByText(
        "EmailJS is not configured. Add NEXT_PUBLIC_EMAILJS_* variables to .env.local.",
      ),
    ).toBeInTheDocument();
  });

  it("initializes emailjs when a public key is provided", () => {
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = "public";

    render(<Contact />);

    expect(emailjs.init).toHaveBeenCalledWith({
      publicKey: "public",
      blockHeadless: true,
    });
  });

  it("submits successfully when configured", async () => {
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = "service";
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = "template";
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = "public";
    (emailjs.send as jest.Mock).mockResolvedValueOnce({});

    render(<Contact />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Swapnil" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "hi@example.com" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => expect(emailjs.send).toHaveBeenCalled());
    expect(emailjs.send).toHaveBeenCalledWith(
      "service",
      "template",
      expect.objectContaining({
        from_name: "Swapnil",
        from_email: "hi@example.com",
        message: "Hello",
      }),
      "public",
    );
    expect(await screen.findByText("Message sent successfully! I will reply soon.")).toBeInTheDocument();
  });

  it("renders an error state when email sending fails", async () => {
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = "service";
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = "template";
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = "public";
    (emailjs.send as jest.Mock).mockRejectedValueOnce(new Error("Network issue"));

    render(<Contact />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Swapnil" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "hi@example.com" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByText("Network issue")).toBeInTheDocument();
  });
});
