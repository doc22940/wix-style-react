export const textTitle = `
<Card>
<Card.Header title="Simple Card" />
<Card.Subheader title="Subheader Title" />
<Card.Content>Card Content Goes Here</Card.Content>
</Card>
`;

export const neutralSkin = `
<Card>
<Card.Header title="Simple Card" />
<Card.Subheader skin="neutral" title="Subheader Title" />
<Card.Content>Card Content Goes Here</Card.Content>
</Card>
`;

export const nodeTitle = `
<Card>
<Card.Header title="Simple Card" />
<Card.Subheader title={<div style={{backgroundColor: 'yellow'}}>Custom Title Node</div>} />
<Card.Content>Card Content Goes Here</Card.Content>
</Card>
`;

export const suffix = `
<Card>
<Card.Header title="Simple Card" />
<Card.Subheader title="Subheader Title" suffix={<Box><Button>Click Me</Button></Box>} />
<Card.Content>Card Content Goes Here</Card.Content>
</Card>
`;

export const sampleUsage = `
<Card>
  <Card.Header title="Simple Card" />
  <Card.Subheader
    title={
    <Box>
      <Avatar imgProps={{ src: 'https://randomuser.me/api/portraits/women/39.jpg' }} size="size24"/>
      <Box marginLeft={2}>
      <Text weight="normal">Subheader Title</Text>
      </Box>
    </Box>
    }
    suffix={<Button size="tiny">Click Me</Button>}
  />
  <Card.Content>Card Content Goes Here</Card.Content>
</Card>
`;
