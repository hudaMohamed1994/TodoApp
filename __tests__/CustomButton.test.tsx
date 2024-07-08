import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../src/components/CustomButton';

describe('CustomButton', () => {
  it('renders CutomButton with default props', () => {
    const { getByText } = render(<CustomButton title="Click Me" onPress={() => {}} />);
    const buttonText = getByText('Click Me');
    expect(buttonText).toBeTruthy();
  });

  it('applies Custom styles and text color', () => {
    const { getByText } = render(
      <CustomButton title="Styled Button" onPress={() => {}} backgroundColor="green" color="yellow" />
    );
    const buttonText = getByText('Styled Button');
    expect(buttonText).toHaveStyle({ color: 'yellow' });
  });

  it('test button when clicked', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<CustomButton title="Press Me" onPress={onPressMock} />);
    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
