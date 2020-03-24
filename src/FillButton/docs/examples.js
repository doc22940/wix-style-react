export const simple = `
<Box height="24px"><FillButton tooltipProps={{ content: 'hello there' }} /></Box>
`;

export const fill = `
<Box height="24px">
  <Layout cols={4}>
    <FillButton fill="#3399ff" tooltipProps={{ content: 'hello there' }} />
    <FillButton fill="linear-gradient(#DBE6B3, #D7E6B3)" tooltipProps={{content: "hello there"}} />
  </Layout>
</Box>
`;

export const state = `
<Box height="24px">
    <FillButton fill="#3399ff" disabled tooltipProps={{ content: 'hello there' }} />
</Box>
`;
