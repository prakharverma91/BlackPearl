import { Injectable } from '@angular/core';



export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}


//const MENUITEMS = [
//   {
//     state: 'dashboard',
//     name: 'Dashboard',
//     type: 'link',
//     icon: 'dashboard'
//   },
//   {
//     state: 'account',
//     name: 'Account Settings',
//     type: 'sub',
//     icon: 'cog',
//     children: [
//       {
//         state: 'profile',
//         name: 'Profile'
//       },
//       {
//         state: 'changepassword',
//         name: 'Change Password'
//       },
//       {
//         state: '',
//         name: 'Change Email id'
//       }
//     ]
//   },
//    {
//     state: 'verification',
//     name: 'Verification',
//     type: 'sub',
//     icon: 'newspaper-o',
//     children: [
//       {
//         state: 'agency',
//         name: 'Verification Agency'
//       },
//     {
//         state: 'request',
//         name: 'Verification Request'
//       }
//     ]
//   }, 
//   {
//     state: 'document',
//     name: 'Document',
//     type: 'sub',
//     icon: 'file-text',
//     children: [
//       {
//         state: 'list-of-document',
//         name: 'Kyc Document Type'
//       },
//        {
//         state: 'country-of-document',
//         name: 'Kyc User Document'
//       },
//     {
//         state: 'meta-document',
//         name: 'Kyc Document Meta'
//       }
//     ]
//   },
//   {
//     state: 'role',
//     name: 'Role',
//     type: 'link',
//     icon: 'user '
//   },
//   {
//     state: 'users',
//     name: 'Users',
//     type: 'link',
//     icon: 'users'
//   },
//   {
//     state: 'activities',
//     name: 'Activities',
//     type: 'link',
//     icon: 'bullseye'
//   },
//   {
//     state: '',
//     name: 'Signout',
//     type: 'link',
//     icon: 'arrows-v'
//   }
 //];


var accessData = [
  {
    state: 'dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'dashboard'
  },
  {
    state: 'account',
    name: 'Account Settings',
    type: 'sub',
    icon: 'cog',
    children: [
      {
        state: 'profile',
        name: 'Profile'
      },
      {
        state: 'changepassword',
        name: 'Change Password'
      },
       {
         state: 'document',
         name: 'My Documents'
       }
    ]
  },
   {
    state: 'verification',
    name: 'Verification',
    type: 'sub',
    icon: 'newspaper-o',
    children: [
      {
        state: 'agency',
        name: 'Verification Agency'
      },
    {
        state: 'request',
        name: 'Verification Request'
      }
    ]
  }, 
  {
    state: 'document',
    name: 'Document',
    type: 'sub',
    icon: 'file-text',
    children: [
      {
        state: 'list-of-document',
        name: 'Document Type'
      },
       {
        state: 'country-of-document',
        name: 'Country Document Mapping'
      },
    {
        state: 'meta-document',
        name: 'Document Meta'
      }
    ]
  },

  {
    state: 'role',
    name: 'Role',
    type: 'link',
    icon: 'user '
  },
  {
    state: 'users',
    name: 'Users',
    type: 'link',
    icon: 'users'
  },
  {
    state: 'action',
    name: 'Action',
    type: 'link',
    icon: 'bullseye'
   },
  // {
  //   state: 'node-info',
  //   name: 'NodeInfo',
  //   type: 'link',
  //   icon: 'renren'
  // },

  {
    state: '',
    name: 'Signout',
    type: 'link',
    icon: 'arrows-v'
  }
]

var userMenu = [
  {
    state: 'dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'dashboard'
  },
  {
    state: 'account',
    name: 'Account Settings',
    type: 'sub',
    icon: 'cog',
    children: [
      {
        state: 'profile',
        name: 'Profile'
      },
      {
        state: 'changepassword',
        name: 'Change Password'
      },
       {
         state: 'document',
         name: 'My Documents'
       }
    ]
  }, 
  // {
  //   state: 'node-info',
  //   name: 'NodeInfo',
  //   type: 'link',
  //   icon: 'renren'
  // },
  {
    state: '',
    name: 'Signout',
    type: 'link',
    icon: 'arrows-v'
  }
]

var merchantMenu = [
  {
    state: 'dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'dashboard'
  },
  {
    state: 'account',
    name: 'Account Settings',
    type: 'sub',
    icon: 'cog',
    children: [
      {
        state: 'profile',
        name: 'Profile'
      },
      {
        state: 'changepassword',
        name: 'Change Password'
      },
       {
         state: 'document',
         name: 'My Documents'
       }
    ]
  }, 
  // {
  //   state: 'node-info',
  //   name: 'NodeInfo',
  //   type: 'link',
  //   icon: 'renren'
  // },
  {
    state: '',
    name: 'Signout',
    type: 'link',
    icon: 'arrows-v'
  }
]


var MENUITEMS = accessData.map(x => Object.assign({}, x));


@Injectable()
export class MenuItems {   
  getAll(): Menu[] {
    return MENUITEMS;
  }
  dash(){

    var userType:any = localStorage.getItem('roleName');
    if(userType == null || undefined == undefined){
      MENUITEMS = userMenu.map(x => Object.assign({}, x));
    }

    if(userType == 'admin'){
    MENUITEMS = accessData.map(x => Object.assign({}, x));
    }
    if(userType == 'user'){
      MENUITEMS = userMenu.map(x => Object.assign({}, x));
    }

    if(userType == 'user'){
      MENUITEMS = merchantMenu.map(x => Object.assign({}, x));
    }
    // else{
    //   MENUITEMS = accessData.map(x => Object.assign({}, x));
    // }
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }

}
