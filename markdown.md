# github踩坑记录

# 1. github鉴权失败
- A: github的密码不是登陆密码， 而是token, 在setting -> developer settings -> Person access tokens中设置， 且新建公钥时生成后复制下来保存到本地，否则后面就看不到了

# 2. github代码推送报错  Permission to <USERNAME>/<REPO>.git denied to <USERNAME>. / The requested URL returned error: 403
- https连接不稳定，经常无法推送，改用https,下面为基本操作步骤

1. 核心流程

   * 1.1 检查本地是否存在SSH密钥：
   ```bash
   ls -al ~/.ssh  # 查看是否存在id_rsa（私钥）和id_rsa.pub（公钥）这样的文件。
   #`id_rsa`：**私钥文件**（Private Key），必须严格保密，相当于你的"密码"。
   #`id_rsa.pub`：**公钥文件**（Public Key），可公开，用于配对验证，相当于"锁"。
   ```
   
   * 如果找不到 ***id_rsa*** 和 ***id_rsa.pub*** 文件， 说明你还没生成SSH密钥对，需要按照下面的步骤1.2生成
   * 如果找到了这些文件： 请跳到步骤1.3，将你的公钥对添加到GitHub

   * 1.2 生成新的SSH密钥对
   
   * 生成命令
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"  
   # -t 指定密钥类型，-b 指定密钥长度，-C 添加注释（建议用你的 GitHub 账户关联的邮箱地址）
   ```
   * 交互提示中可直接回车使用默认路径（~/.ssh/id_rsa），也可以自定义路径。
   * 可选设置密钥密码（增加安全性，但自动化部署时可能需额外配置）。如果设置了密码，请记住这个密码
   
   * 1.3 将SSH公钥添加到你的 github 账户
      1. 复制公钥内容：使用以下命令将你的公钥复制到剪贴板（如果你的公钥文件名不是 id_rsa.pub，请替换成你的文件名）：
      * ***macOS:***
      ```bash
      pbcopy < ~/.ssh/id_rsa.pub
      ```

      * ***Linux:***
      ```bash
      xclip -sel clip < ~/.ssh/id_rsa.pub
      ```
      * 如果***xclip***没有安装，可以使用 ***cat*** 命令手动复制
      ```bash
      cat ~/.ssh/id_rsa.pub
      ```

      * ***Windows:***
       ```bash
       clip < ~/.ssh/id_rsa.pub
       ```
      * 或者使用文本编辑器打开 ~/.ssh/id_rsa.pub 文件并手动复制内容。
     
      2. 添加到github:
     
         * 登录你的 GitHub 账户
         * 点击右上角的头像，然后选择 "Settings"。
         * 在左侧边栏中，点击 "SSH and GPG keys"。
         * 点击 "New SSH key" 或 "Add SSH key"。
         * 在 "Title" 字段中，为你的密钥添加一个描述性的名称（例如，"My Laptop"）。
         * 在 "Key" 字段中，粘贴你刚刚复制的公钥。
         * 点击 "Add SSH key"。如果提示，输入你的 GitHub 密码进行确认。

   * 1.4 测试SSH连接
   * 验证命令 
   ```bash
   ssh -T git@github.com  
   # 成功会显示"Hi username! You've successfully authenticated, but GitHub does not provide shell access."
   ```
   * 
     * 确保远端Git仓库的URL 使用 SSH: 
     * 检查项目 .git/config 文件中的 remote "origin" url是否是以 git@github.com: 开头。如果不是，需要将其更改为 SSH URL
     * 
     * 查看远端仓库 URL: git remote -v
     *  
     * 如果输出的 URL 是 https://github.com/<USERNAME>/<REPO>.git 这种 HTTPS 形式，你需要将其更改为 SSH 形式：git remote set-url origin git@github.com:<USERNAME>/<REPO>.git

2. 密钥安全建议：
    - 切勿将 ***id_rsa*** 文件上传到Git仓库或公开位置
    - 定期轮换密钥（GitHub支持多密钥共存，删除旧密钥即可）
