import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ErrorText from "./ErrorText";

describe('ErrorText', () => {
  it('should renders the error message when provided', () => {
    const { queryByRole } = render(<ErrorText id="fullname-error" message="Please fill fullname field" />)

    expect(queryByRole('status')).toBeInTheDocument()
    expect(queryByRole('status')).toHaveTextContent('Please fill fullname field')
  })

  it('should renders nothing if the error message is empty', () => {
    const { queryByRole } = render(<ErrorText id="fullname-error" message="" />)

    expect(queryByRole('status')).not.toBeInTheDocument()
  })
})
