// import * as React from 'react';
// import { observer } from 'mobx-react-lite';

// import store from '~/renderer/app/store';
// import { MenuContainer, MenuItem } from '..';
// import { MenuDivider } from '../style';
// import { icons } from '~/renderer/constants/icons';

// const onOpen = () => {
//   // const page = store.pages.current;
//   // page.path.pushRelative(page.focusedFile.name);
// };

// const onOpenInNewTab = () => {
//   // const page = store.pages.current;
//   // const { site } = page.session;
//   // for (const file of page.selectedFiles) {
//   //   store.tabs.addTab({
//   //     active: true,
//   //     path: page.path.relative(file.name),
//   //     site,
//   //   });
//   // }
// };

// const onCut = () => {
//   const files = store.pages.current.files;

//   files.cutFiles(...files.selected);
// };

// const onRename = () => {
//   store.dialog.show('rename-file');
// };

// const onDelete = () => {
//   // const page = store.pages.current;
//   // page.delete(page.selectedFiles);
// };

// const onDownload = () => {
//   // const page = store.pages.current;
//   // const paths = page.selectedFiles.map(r => page.path.relative(r.name));
//   // page.session.download(...paths);
// };

// export const FileMenu = observer(() => {
//   const page = store.pages.current;
//   if (!page) return null;

//   const containsFile = true; // !!page.selectedFiles.find(e => e.type !== 'folder');
//   const multiple = false; ///page.selectedFiles.length > 1;

//   return (
//     <MenuContainer content="file">
//       <MenuItem
//         onClick={onOpen}
//         icon={icons.folderOutline}
//         hidden={multiple || containsFile}
//       >
//         Open
//       </MenuItem>
//       <MenuItem
//         onClick={onOpenInNewTab}
//         icon={icons.openInNew}
//         iconSize={18}
//         hidden={containsFile}
//       >
//         Open in new tab
//       </MenuItem>
//       <MenuItem
//         icon={icons.apps}
//         iconSize={18}
//         hidden={multiple || !containsFile}
//         disabled
//       >
//         Open with
//       </MenuItem>
//       {/*(multiple !== containsFile || !containsFile) && <MenuDivider />*/}
//       <MenuItem
//         icon={icons.cut}
//         iconSize={16}
//         onClick={onCut}
//         accelerator={'Ctrl+X'}
//       >
//         Cut
//       </MenuItem>
//       <MenuItem
//         icon={icons.paste}
//         iconSize={18}
//         onClick={page?.files.onPaste}
//         hidden={false /*!page.cutFiles.length || containsFile*/}
//         accelerator={'Ctrl+V'}
//       >
//         Paste
//       </MenuItem>
//       <MenuItem
//         icon={icons.edit}
//         onClick={onRename}
//         hidden={multiple}
//         accelerator={'F2'}
//       >
//         Rename
//       </MenuItem>
//       <MenuItem
//         icon={icons.delete}
//         iconSize={20}
//         onClick={onDelete}
//         accelerator={'Del'}
//       >
//         Delete
//       </MenuItem>
//       <MenuDivider />
//       <MenuItem
//         icon={icons.downloadOutline}
//         hidden={!containsFile}
//         onClick={onDownload}
//       >
//         Download
//       </MenuItem>
//       <MenuItem icon={icons.zip} iconSize={18} hidden={!containsFile} disabled>
//         Archive
//       </MenuItem>
//       {containsFile && <MenuDivider />}
//       <MenuItem icon={icons.details} iconSize={18} disabled>
//         Details
//       </MenuItem>
//     </MenuContainer>
//   );
// });
