# Custom Input of type file 

## Usage:

```sh
new Upload(inputSelector, options, uploadHendler)
```
- inputSelector - string of file input selector
- options - an object with the required parameters
- uploadHendler - function for uploading files to the server
## Parametrs:

| Optins | Description | Type | Default |
| ------ | ------ | ------- | ------- | 
| multi | allows to select multiple files | boolean |false |
| accept | array of allowed extensions | arr | ['.jpg', '.png', '.jpeg', '.svg', 'gif'] |
| openBtnText | open button text | string | 'Open' |
| uploadBtnText | upload button text | string | 'Upload' |
| openBtnClass | open button classes | arr |  ['btn'] |
| uploadBtnClass | open button classes | arr | ['btn', 'primary'] |
| previewWrapperClass | preview wrapper classes | arr | ['preview'] |
| previewImageWrapperClass |  preview image wrapper class | string | 'preview-image' |
| previewImageClass |  preview image classes | arr | ['img'] |
| previewRemoveClass |  element classes responsible for removing a file from the preview list | arr | ['preview-remove'] |
| previewInfoClass |  classes of file-name and file-size wrapper | arr | ['preview-info'] |
| fileNameClass |  file-name elem classes | arr | ['file-name'] |
| fileSizeClass |  file-size elem classes | arr | ['file-size'] |
| removingClass |  this class is assigned before the element is removed to play the animation  | string | 'removing' |
| removingAnimatitionDuration |  the number of milliseconds after which the item will be removed  | number | 333 |
