## Introduction
This is a simple scaffold to help you create projects with predefined templates. You can also add you own template.

## Installation

```javascript
npm install jim-cli -g
```

## Usage

Open your terminal and type `jim-cli -h` , you'll see the help information below.

```
Usage: jim-cli <command>

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  add|a           add a new template
  delete|d        delete a template
  list|l          list templates
  init|i          init a project
  help [command]  display help for command
```

## jim-cli add

This command would help you to add a new template to the `template.json`, which will be used to init projects.

```
$ jim-cli add
✔ Input name of template vue
✔ Input download address of template https://github.com/Jim-Elijah/jim-cli-vue-template.git
✔ Add template vue successfully!

The latest template is:
name  url
----  ------------------------------------------------------
vue   https://github.com/Jim-Elijah/jim-cli-vue-template.git

```

## jim-cli delete

To delete a template, you could use this command.

```
$ jim-cli delete
✔ Search name of template vue
✔ Are you sure to delete? Yes
✔ Delete template vue successfully!

The latest template is:
name   url
-----  --------------------------------------------------------
react  https://github.com/Jim-Elijah/jim-cli-react-template.git
└──────┴──────────────────────────────────────────────────┘
```

## jim-cli list

This command will show you the template list.

```
$ jim-cli list
The latest template is:
name   url
-----  --------------------------------------------------------
react  https://github.com/Jim-Elijah/jim-cli-react-template.git
```

## jim-cli init 

This command would help you create a project with a selected template. 

```
$ jim-cli init
✔ Input project name my-project
✔ Select a template react

 Start generating react 

✔ Downloading...
✔ Generating my-project completed!

 To get started
cd my-project
```