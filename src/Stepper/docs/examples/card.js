/* eslint-disable */
class StepperWithCard extends React.PureComponent {
  state = {
    activeStep: 2,
  };

  render() {
    return (
      <Card>
        <Card.Header
          title={
            <Stepper
              activeStep={this.state.activeStep}
              steps={[
                { text: 'First step', type: 'completed' },
                { text: 'Second step', type: 'completed' },
                { text: 'Third step' },
                { text: 'Fourth step', type: 'disabled' },
              ]}
              onClick={activeStep => this.setState({ activeStep })}
            />
          }
        />
        <Card.Divider />
        <Card.Content>
          Here goes the content of step #{this.state.activeStep + 1}
        </Card.Content>
      </Card>
    );
  }
}
