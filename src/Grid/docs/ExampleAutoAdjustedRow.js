import React from 'react';

import { Container, AutoAdjustedRow } from 'wix-style-react/Grid';
import Button from 'wix-style-react/Button';
import Card from 'wix-style-react/Card';
import Tooltip from 'wix-style-react/Tooltip';
import Text from 'wix-style-react/Text';

export default () => (
  <div style={{ background: '#F0F4F7', padding: 30 }}>
    <Container>
      <AutoAdjustedRow>
        <Card stretchVertically>
          <Card.Header
            title="Stretched Card 1"
            suffix={
              <Tooltip placement="top" alignment="center" content="Hi there!">
                <Button
                  theme="whiteblueprimary"
                  onClick={() => alert('Clicked!')}
                >
                  Tooltip button!
                </Button>
              </Tooltip>
            }
          />
          <Card.Divider />
          <Card.Content>
            <Text>
              Here comes some AMAZING content that will blow your mind. Or just
              show you that the card next to me got my height.
            </Text>
          </Card.Content>
        </Card>

        <Card stretchVertically>
          <Card.Header
            title="Stretched Card 2"
            suffix={
              <Tooltip placement="top" alignment="center" content="Hi there!">
                <Button
                  theme="whiteblueprimary"
                  onClick={() => alert('Clicked!')}
                >
                  Tooltip button!
                </Button>
              </Tooltip>
            }
          />
          <Card.Divider />
        </Card>
      </AutoAdjustedRow>

      <AutoAdjustedRow>
        <Card>
          <Card.Header title="Card 1" />
          <Card.Divider />
        </Card>

        <Card>
          <Card.Header title="Card 2" />
          <Card.Divider />
        </Card>

        <Card>
          <Card.Header title="Card 3" />
          <Card.Divider />
        </Card>

        <Card>
          <Card.Header title="Card 4" />
          <Card.Divider />
        </Card>
      </AutoAdjustedRow>
    </Container>
  </div>
);
