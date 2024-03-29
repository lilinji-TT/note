# A little knowledge about GoLang

### 1.一个go的项目入口文件应该是什么文件？

**Answer :**

在Go语言中，一个项目的入口文件通常是名为 `main.go` 的文件。这个文件包含了 `main` 函数，它是程序的入口点。当您运行该程序时，Go编译器会首先执行 `main` 函数。您可以在 `main` 函数中初始化程序，并调用其他函数或启动其他模块。

### 2.我需要安装一个第三方的库我应该执行什么？

**Answer :**

您可以使用 `go get` 命令来安装第三方库。您需要在终端中执行以下命令：

```
go get <package-name>
```

其中 `<package-name>` 是您要安装的包的名称。例如，如果您要安装 `gorilla/mux` 包，您可以执行以下命令：

```
go get github.com/gorilla/mux
```

这将从GitHub下载 `gorilla/mux` 包，并将其安装在您的Go路径中。安装后，您就可以在您的Go项目中使用该包了。

### 3.如果说有很多的库，我不能一个个去打命令对吧？有什么比较简便的方法吗？

**Answer :**

是的，如果您有很多需要安装的库，手动一个个去执行 `go get` 命令可能会很繁琐。为了简化这个过程，您可以使用一个配置文件来管理您的依赖项。

Go语言使用 `go.mod` 文件来管理项目的依赖关系。在项目根目录下执行以下命令来初始化 `go.mod` 文件：

```
go mod init <module-name>
```

其中 `<module-name>` 是您的项目名称。执行此命令后，Go会自动下载并管理您所需要的依赖项。

然后，您可以在 `go.mod` 文件中列出您需要的库和版本。例如：

```
require (     github.com/gorilla/mux v1.8.0     github.com/sirupsen/logrus v1.7.0 )
```

然后，运行以下命令来下载和安装所有依赖项：

```
go mod download
```

这将自动下载并安装您在 `go.mod` 文件中列出的所有依赖项。这种方式更加简便，可以一次性解决所有的库依赖。

### 4.go.sum是什么文件？

**Answer :**

`go.sum` 是Go模块依赖关系的校验和文件。当您使用 `go get` 命令安装依赖项时，Go会自动下载所需的模块，并在 `go.sum` 文件中记录每个模块的版本和校验和。

`go.sum` 文件包含了所有依赖模块的版本和校验和，以确保您的代码的安全性和正确性。当您的代码依赖于其他模块时，Go会自动检查 `go.sum` 文件，以确保您的代码使用的是正确的版本和安全的模块。

如果您手动编辑 `go.mod` 文件或者手动修改了 `go.sum` 文件，那么您需要运行 `go mod verify` 命令来验证依赖项的正确性。这将检查 `go.sum` 文件中所有依赖关系的校验和，以确保它们与实际下载的模块的校验和匹配。

### 5.在go文件第一行写这个package为什么？

**Answer :**

在 Go 文件的第一行写入  `package`  是为了指定当前文件所属的包（package）。一个包是一组相关的 Go 文件的集合，用于组织和管理代码。通过指定包名，可以将文件归类到相应的包中，并在其他文件中引用和访问其中的函数、变量和类型。

`package`  声明还决定了文件的可见性。在 Go 中，包内的标识符（如函数、变量、类型）可以是公共的（Public）或私有的（Private）。公共标识符以大写字母开头，可以在其他包中访问和使用，而私有标识符以小写字母开头，仅在当前包内可见。

因此，通过在文件的第一行写入  `package` ，可以明确指定文件所属的包，并定义包内的可见性规则，使代码更具可维护性和组织性。

### 6.package 后面的字符是随意设置的吗？比如我设置为hello，另一个文件里我也设置成了package hello，代表这两个文件属于同一个包？

**Answer :**

在 Go 中， `package`  关键字后面的字符是包的名称，您可以根据自己的需要自由设置。包名称通常是根据包所提供的功能或内容来命名的，但并不会直接影响包之间的关联性。

如果您在两个不同的文件中将  `package`  设置为相同的名称，那么它们将被认为属于同一个包。这意味着这两个文件可以相互引用和访问彼此的公共标识符（以大写字母开头的标识符）。

但是，包的名称并不是唯一用于确定包之间的关联性的因素。包的关联性还取决于它们在文件系统中的位置和导入路径的设置。两个文件必须在同一个目录下，并且它们的导入路径（import path）必须相同，才能被视为属于同一个包。

因此，包的名称只是用来标识包的，而不是直接决定它们之间的关联性。要确保两个文件属于同一个包，您需要将它们放置在同一个目录下，并且在导入时使用相同的导入路径。

### 7.哦，也就是说还分所属的文件夹，不同文件夹下即使声明为同一个name那么他们都是不同的包？

**Answer :**

是的，包的命名不仅取决于  `package`  关键字后面的名称，还取决于文件所在的目录结构。在 Go 中，包的名称是根据包所在的文件夹路径来确定的。

如果两个文件位于不同的文件夹中，即使它们的  `package`  声明相同，它们仍被视为不同的包。这是因为 Go 使用导入路径（import path）来唯一标识一个包，而导入路径包括包的名称和它所在的文件夹路径。

例如，假设有两个文件，一个位于  `pkg1/hello.go` ，另一个位于  `pkg2/hello.go` ，并且它们的  `package`  声明都是  `package hello` 。这两个文件属于不同的包，因为它们的导入路径不同。您在其他文件中导入它们时需要使用完整的导入路径，例如  `import "your-module/pkg1"`  和  `import "your-module/pkg2"` 。

所以，文件夹结构对于包的唯一性和关联性非常重要。不同的文件夹路径会导致不同的包，即使它们的  `package`  声明相同。