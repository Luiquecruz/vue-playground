export interface ButtonProps {
  tag?: string,
  to?: string,
  outter?: boolean,
  text?: string,
}

export const useButtonProps = {
  tag: {
    type: String,
    required: false,
    default: 'button',
  },
  to: {
    type: String,
    required: false,
    default: '',
  },
  outter: {
    type: Boolean,
    required: false,
    default: false,
  },
  text: {
    type: String,
    required: false,
    default: '',
  }
};
