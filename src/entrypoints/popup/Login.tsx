import { Button, Flex, Container } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';

const Login = () => {
  return (
      <Flex
        gap="md"
        direction="column"
      >
        <Container p={0}>
        バクラクにログインしてください
        </Container>
        <Flex
          gap="md"
          direction="column"
        >
          <Button
            fullWidth
            variant="transparent"
            leftSection={<IconExternalLink size={14} />}
            component="a"
            href='https://id.layerx.jp/auth/sign_in'
            target='_blank'
          >
            ID/Password
          </Button>
          <Button
            fullWidth
            variant="transparent"
            leftSection={<IconExternalLink size={14} />}
            component="a"
            href='https://id.layerx.jp/auth/sign_in_sso'
            target='_blank'
          >
            SSO
          </Button>
        </Flex>
      </Flex>
  )
};

export default Login;
