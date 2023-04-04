import { render, screen } from '@testing-library/react';
import SamurayJSApp from './App';
import App from './App';
import ReactDOM from 'react-dom'

test('renders learn react link', () => {
  const div=document.createElement('div');
  ReactDOM.render(<SamurayJSApp />,div);
  ReactDOM.unmountComponentAtNode(div)
  
});
