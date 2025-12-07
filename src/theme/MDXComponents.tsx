import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import Admonitions from "@site/src/components/admonitions"
import modcard from "@site/src/components/modcard"
import doccard from "@site/src/components/doccard"
import joinus from '../components/joinus';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesomeIcon component.
import { library } from '@fortawesome/fontawesome-svg-core'; // Import the library component.
import { fab } from '@fortawesome/free-brands-svg-icons'; // Import all brands icons.
import { fas } from '@fortawesome/free-solid-svg-icons'; // Import all solid icons.
library.add(fab, fas); 


// function 示例标签({children}){
//     return <div className="example_class">{children}</div>
// }



export default {
  ...MDXComponents,
  // 示例标签,

  ...Admonitions,
  ...modcard,
  ...doccard,
  ...joinus,
  FAIcon: FontAwesomeIcon
};


