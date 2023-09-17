# Go-Terminal-GPT

#### Initialization Project

```shell
get mod init gtg
```



#### Install the packages we need, the list of packages is as follows

- ##### cobra

- ##### suery

```shell
go get <package>
```



1.We need to set up the root command with the following code

```go
var rootCmd = &cobra.Command{
		Use: "GTG", //your command
		Short: "A Short Description", //shrot description
		Run: func(cmd *cobraCommand, args []string){
      //...
    }, //Tigger the command to excute function
}

func Excute(){
  err := rootCmd.Excute()
	
  if err != nil {
    fmt.Println(err)
    os.Exit(1)
  }
}	
```



2. Setting up commands for chatting with GPT

```go
const ApiKey = ""//key
const ProxyURL = ""//proxy url

var chatCmd = &cobraCommand{
  Use: "chat",
  //...
}


func Chat(){
  for	{
    scanner.Scan() //
    userIput := scanner.Text()
    if userInput == "exit" {
      break
    }
    gpt.GenerateStreamWithGPT(userInput, &GlobMessage, confing.Model)
  }
}

func init(){
  rootCmd.AddCommand(chatCmd)
  
  chatCmd.Run = Chat
}
```



3.chatting with GPT

```go



```

