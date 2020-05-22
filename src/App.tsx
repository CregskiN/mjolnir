import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';


function App() {
  return (
    <div className="App">
      <Button>Button</Button>
      <Button className="hello" disabled>Disabled Button</Button>
      <Button onClick={(e) => {console.log(e)}} btnType={ButtonType.Primary} size={ButtonSize.Large}>Primary Large</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Danger Large</Button>
      <Button btnType={ButtonType.Default}>Default Default</Button>
      <Button btnType={ButtonType.Link} href='http://www.baidu.com' target="_blank">Default Link</Button>
      <Button btnType={ButtonType.Link} href='http://www.baidu.com' size={ButtonSize.Small}>Small Link</Button>
      <Button btnType={ButtonType.Link} href='http://www.baidu.com' disabled>Disabled Link</Button>
    </div>
  );
}

export default App;
