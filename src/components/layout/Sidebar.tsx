import Navigation from './Navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-black transition duration-300 ease-in-out lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-4 gap-3">
            <div className="w-8 h-8 border-2 border-black dark:border-white rounded-lg">
              {/* TODO: ADD THE LOGO FOR THE COMPANY */}
            </div>
            <span className="text-black dark:text-white">
              ABC Company
            </span>
          </div>
          <Navigation onItemClick={onClose} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;