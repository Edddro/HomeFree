import { AppConfig } from '@/utils/AppConfig';

export const Logo = (props: {
  isTextHidden?: boolean;
}) => (
  <div className="flex items-center text-xl font-semibold">
    <img
      src={'apple-touch-icon.png'}
      alt="Logo"
      className="mr-1"
      width="32" // Adjust the width as needed
      height="32" // Adjust the height as needed
    />
    {!props.isTextHidden && AppConfig.name}
  </div>
);