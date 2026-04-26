import { render, screen } from "@testing-library/react"
import { GlassButton } from "../GlassButton"

describe("GlassButton", () => {
  it("renders children correctly", () => {
    render(<GlassButton>Donate Now</GlassButton>)
    expect(screen.getByText("Donate Now")).toBeInTheDocument()
  })

  it("applies glass class by default", () => {
    render(<GlassButton>Test</GlassButton>)
    expect(screen.getByText("Test")).toHaveClass("glass")
  })

  it("applies primary variant classes", () => {
    render(<GlassButton variant="primary">Test</GlassButton>)
    const button = screen.getByText("Test")
    expect(button).toHaveClass("bg-blue-600", "text-white")
  })

  it("applies secondary variant classes", () => {
    render(<GlassButton variant="secondary">Test</GlassButton>)
    const button = screen.getByText("Test")
    expect(button).toHaveClass("bg-white/20", "text-slate-900")
  })
})