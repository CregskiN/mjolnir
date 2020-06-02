import React from 'react';
import './App.css';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
	return (
		<div className="App">
			<Button>Button</Button>
			<Button className="hello" disabled>Disabled Button</Button>
			<Button onClick={(e) => { console.log(e) }} btnType={ButtonType.Primary} size={ButtonSize.Large}>Primary Large</Button>
			<Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Danger Large</Button>
			<Button btnType={ButtonType.Default}>Default Default</Button>
			<Button btnType={ButtonType.Link} href='http://www.baidu.com' target="_blank">Default Link</Button>
			<Button btnType={ButtonType.Link} href='http://www.baidu.com' size={ButtonSize.Small}>Small Link</Button>
			<Button btnType={ButtonType.Link} href='http://www.baidu.com' disabled>Disabled Link</Button>

			<div>
				<Menu onSelect={(index) => { console.log(index) }}>
					<MenuItem>
						cool link 1
          			</MenuItem>
					<MenuItem disabled>
						cool link 2
          			</MenuItem>
					<SubMenu title="dropDown">
						<MenuItem>
							dropDown 1
            			</MenuItem>
						<MenuItem>
							dropDown 2
            			</MenuItem>
						<MenuItem>
							dropDown 3
            			</MenuItem>
					</SubMenu>
					<MenuItem>
						cool link 3
          			</MenuItem>
				</Menu>
			</div>

			<div>
				<Menu onSelect={(index) => { console.log(index) }} mode='vertical'>
					<MenuItem>
						cool link 1
          </MenuItem>
					<MenuItem disabled>
						cool link 2
          </MenuItem>
					<SubMenu title="dropDown">
						<MenuItem>
							dropDown 1
            </MenuItem>
						<MenuItem>
							dropDown 2
            </MenuItem>
						<MenuItem>
							dropDown 3
            </MenuItem>
					</SubMenu>
					<MenuItem>
						cool link 3
          </MenuItem>
				</Menu>
			</div>
		</div>
	);
}

export default App;
