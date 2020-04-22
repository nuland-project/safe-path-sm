import { render } from '@testing-library/react-native';
import React from 'react';

import { ExportScreen } from '../Export';

describe('<ExportScreen />', () => {
  it('renders correctly', () => {
    const { asJSON } = render(<ExportScreen />);
    expect(asJSON()).toMatchSnapshot();
  });

  describe('Share button', () => {
    it('should be disabled if not data is in the log', () => {
      const component = create(<Export />);
      const instance = component.root;
      const shareButton = instance.findAllByType(TouchableOpacity)[1];
      expect(shareButton.props.disabled).toBeTruthy();
    });

    it('should be disabled if not data is in the log', () => {
      const component = create(<Export shareButtonDisabled={false} />);
      const instance = component.root;
      const shareButton = instance.findAllByType(TouchableOpacity)[1];
      expect(shareButton.props.disabled).toBeFalsy();
    });
  })
});
