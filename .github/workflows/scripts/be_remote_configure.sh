ssh rcb <<'CONTENT'
    # Java Install
    # https://adoptium.net/installation/linux/
    sudo apt -qq update
    sudo apt -qq install -y wget apt-transport-https gpg
    wget -qO - https://packages.adoptium.net/artifactory/api/gpg/key/public | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/adoptium.gpg > /dev/null
    echo "deb https://packages.adoptium.net/artifactory/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | sudo tee /etc/apt/sources.list.d/adoptium.list

    # Install Java JRE and screen
    sudo apt -qq update
    sudo apt -qq install -y temurin-21-jre screen

    # If a screen from a previous run already exists then stop the server and exit the screen
    if screen -list | grep -q "rcb-be"; then
        screen -S "rcb-be" -X stuff "^C"
        sleep 10s
        screen -S "rcb-be" -X stuff "exit$(printf \\r)"
    fi

    # Create the screen to monitor server logs
    screen -d -m -S "rcb-be"

    # Create the server folder if it doesn't already exist and remove files from a previous run if they exist
    mkdir -p ~/rcb-be/ 2> /dev/null
    rm -rf ~/rcb-be/*
CONTENT
