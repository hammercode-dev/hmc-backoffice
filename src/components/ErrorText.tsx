import styled from "styled-components";

const Container = styled.div`
  color: red;
`

type InputErrorProps = {
  /**
   * The ID of element
   */
  id: string
  message?: string | undefined
}

export default function ErrorText({ id, message }: InputErrorProps) {
  if (!message) return null
  return <Container role="status" aria-label={id} id={id}>{message}</Container>
}
