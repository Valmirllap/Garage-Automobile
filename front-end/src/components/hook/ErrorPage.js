import styled from 'styled-components'

export default function ErrorPage({error}) {
  return (
    <Error>{error}</Error>
  )
}

const Error = styled.p`
  font-family: libre baskerville;
  font-size: 25px;
  font-weight: 600;
  color: #ec1329;
`;