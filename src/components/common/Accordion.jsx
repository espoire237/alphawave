/**
 * Accordion Component
 * Collapsible content sections
 * @component
 */

import { useState } from 'react';

/**
 * @typedef {Object} AccordionItem
 * @property {string} id - Unique identifier
 * @property {string} title - Item title
 * @property {React.ReactNode} content - Item content
 */

/**
 * @typedef {Object} AccordionProps
 * @property {Array<AccordionItem>} items - Accordion items
 * @property {boolean} [allowMultiple=false] - Allow multiple open items
 * @property {string} [className] - Additional CSS classes
 */

/**
 * Accordion Component
 * @param {AccordionProps} props - Component props
 * @returns {JSX.Element}
 */
const Accordion = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);

    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      if (!allowMultiple) {
        newOpenItems.clear();
      }
      newOpenItems.add(id);
    }

    setOpenItems(newOpenItems);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Header */}
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                openItems.has(item.id) ? 'transform rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {/* Content */}
          {openItems.has(item.id) && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-gray-700">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
