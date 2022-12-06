## Installation

```
npm install cm-vcli -g
```

or

```
git clone https://github.com/Michael-lzg/cm-cli.git
cd cm-cli && npm install
npm link
```

## Usage

Open your terminal and type `cm -h` , you'll see the help infomation below:

```
Usage: cm <command>

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  add            add a new template
  delete         delete a template
  list           List the templateList
  init           init a project
```

## cm add

This command would help you to add a new template to the `templates.json`, which will be used by `cm` to init projects.

```
$ cm add
? 请输入模板名称 admin
? 请输入模板地址 https://github.com/Michael-lzg/vue-ant-template.git

√ Add a template successfully!

The latest templateList is:

┌───────┬─────────────────────────────────────────────────────┐
│ name  │ url                                                 │
├───────┼─────────────────────────────────────────────────────┤
│ app   │ https://github.com/Michael-lzg/vue-cli4-vant.git    │
├───────┼─────────────────────────────────────────────────────┤
│ admin │ https://github.com/Michael-lzg/vue-ant-template.git │
└───────┴─────────────────────────────────────────────────────┘
```

## cm delete

To delete a template, you could use this command:

```
$ cm delete
? 请输入要删除的模板名称 admin
? 请输入要删除的模板名称 admin

√ Deleted successfully!

The latest templateList is:

┌──────┬──────────────────────────────────────────────────┐
│ name │ url                                              │
├──────┼──────────────────────────────────────────────────┤
│ app  │ https://github.com/Michael-lzg/vue-cli4-vant.git │
└──────┴──────────────────────────────────────────────────┘
```

## cm list

This command will shows you the templates list.

```
$ cm list
┌──────┬──────────────────────────────────────────────────┐
│ name │ url                                              │
├──────┼──────────────────────────────────────────────────┤
│ app  │ https://github.com/Michael-lzg/vue-cli4-vant.git │
└──────┴──────────────────────────────────────────────────┘
```

## cm init 

You can init a templates use this command

```
cm init app project
```