// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta } from '@storybook/react';
import Input, { InputProps } from '../../../../components/atoms/Input';

export default {
  title: 'Components/Atoms/Input',
  component: Input,
} as Meta;

const Template = (props: InputProps) => <Input {...props} />;

export const Default = Template.bind({});
