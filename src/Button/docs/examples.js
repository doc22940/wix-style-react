export const primary = `
<Layout cols={2}>
<Cell>
  <Layout cols={2}>
    <Cell>
      <Layout cols={4} gap="10px"  alignItems="center">  
        <Button >standard</Button>
        <Box backgroundColor="D10" padding="3px"> 
          <Button skin="light" fullWidth>light</Button>
        </Box>
        <Button skin="destructive">destructive</Button>
        <Button skin="premium">premium</Button>
      
      </Layout>
    </Cell>
    <Cell>
      <Layout cols={3} gap="10px" justifyItems="center">  
        <Box backgroundColor="B20" padding="3px"> 
          <Button skin="transparent">transparent</Button>
        </Box>
        <Button skin="dark">dark</Button>
        <Button skin="premium-light">premium-light</Button>
      </Layout>
    </Cell>
  </Layout>
</Cell>
<Cell>
  <Layout >
    <Cell>
      <Layout cols={4} gap="10px" justifyItems="center" alignItems="center">   
        <Button priority="secondary">standard</Button>
        <Box backgroundColor="D10" padding="3px"> 
          <Button priority="secondary" skin="light" fullWidth>light</Button>
        </Box>
        <Button skin="inverted">inverted</Button>
        <Button skin="destructive" priority="secondary">destructive</Button>
      </Layout>
    </Cell>
    <Cell>
      <Layout cols={3} gap="10px" justifyItems="center">  
      <Box backgroundColor="B20" padding="3px"> 
        <Button priority="secondary" skin="transparent">transparent</Button>
      </Box> 
      <Box backgroundColor="Y30" padding="3px"> 
          <Button priority="secondary" skin="dark" fullWidth>dark</Button>
        </Box>
        <Box backgroundColor="D10" padding="3px"> 
          <Button priority="secondary" skin="premium-light" fullWidth>premium-light</Button>
        </Box>
      </Layout>
    </Cell>
  </Layout>
</Cell>
</Layout>
`;

export const sizes = `
<Layout cols={4} gap="10px"> 
  <Button size="large">large</Button>
  <Button size="medium">medium</Button> 
  <Button size="small">small</Button>
  <Button size="tiny">tiny</Button>  
</Layout>
`;

export const affixes = `
<Layout cols={4} gap="10px"> 
  <Button size="medium" prefixIcon={<Icons.Add />}>Prefix</Button>
  <Button size="small" suffixIcon={<Icons.ChevronDownSmall/>}>Suffix</Button>
</Layout>
`;

export const states = `
<Layout cols={4} gap="10px">
  <Button><Loader size="tiny" /></Button>
  <Button disabled>Disabled</Button>
</Layout>
`;

export const custom = `
<Layout cols={3} gap={0} justifyItems="center">
  <Box direction="vertical" align="center">
    <p>An &lt;a/&gt; tag</p>
    <Button as="a" href="https://www.wix.com" target="_blank">wix.com</Button>
  </Box>
  <Box direction="vertical" align="center">
    <p>A react router &lt;Link/&gt; tag</p>
    <Button as={Link} skin="premium" to="/home">Go to Home</Button>
  </Box>
  <Box direction="vertical" align="center">
    <p>A native &lt;button/&gt; tag</p>
    <Button as="button" onClick={() => alert('yay')}>Alert yay</Button>
  </Box>
</Layout>
`;

export const ellipsis = `
<div style={{ width: '50px' }}>
  <Button size="medium" fullWidth={true}>Ellipsis</Button>
</div>
`;
