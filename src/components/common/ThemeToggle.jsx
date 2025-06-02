import { Button } from '../ui/button';
import { useTheme } from '../../context/ThemeContext';
import ApperIcon from '../ApperIcon';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="h-9 w-9 p-0"
    >
      <ApperIcon 
        name={theme === 'light' ? 'Moon' : 'Sun'} 
        className="h-4 w-4 transition-all" 
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;