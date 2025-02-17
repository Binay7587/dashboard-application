import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDown, LogOut, MenuIcon } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onLogout: () => void;
}

const Header = ({ onMenuClick, onLogout }: HeaderProps) => {
  return (
    <header className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      <div className="flex-1">
      </div>

      <div className="flex items-center space-x-4">
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center space-x-2 text-sm font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2">
            <span className="w-8 h-8 rounded-full border-2 border-black dark:border-white flex items-center justify-center">
              BK
            </span>
            <span className="hidden sm:inline">Binaya Karki</span>
            <ChevronDown className="h-4 w-4" />
          </MenuButton>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg focus:outline-none">
              <div className="py-1">
                <MenuItem>
                  {({ active }: { active: boolean }) => (
                    <button
                      className={`${active ? 'bg-gray-100 dark:bg-gray-800' : ''
                        } flex w-full items-center px-4 py-2 text-sm text-black dark:text-white`}
                      onClick={onLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

export default Header;