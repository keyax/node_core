sudo apt-get remove -y docker docker-engine docker.io
lsb_release -cs

sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update

apt-cache policy docker-ce

sudo apt-get install docker-ce
# apt-cache madison docker-ce
# docker-ce | 17.03.1~ce-0~ubuntu-xenial | https://download.docker.com/linux/ubuntu xenial/stable amd64 Packages
# sudo apt-get install docker-ce=17.03.1~ce-0~ubuntu-xenial

# sudo groupadd docker
if ! [ $(getent group docker) ]; then 
     sudo groupadd docker 
#     exit 1 
     echo docker created
else 
     echo docker exists
fi 
sudo usermod -aG docker $USER
# reloads groups without logout
# exec su -l $USER
echo systemctl status docker
sudo systemctl enable docker
sudo systemctl is-active docker >/dev/null 2>&1 && echo Active || echo Inactive
# 0 stdin 1 stdout 2 stderr  >& redirects stream to file descriptor
docker run hello-world
sudo apt autoremove

#sudo usermod -aG docker username
sudo usermod -aG docker ${USER}
su - ${USER}
id -nG

# install docker-machine /v0.10.0/
sudo apt-get install -y libvirt-bin qemu-kvm
sudo usermod -a -G libvirtd $USER
curl -L https://github.com/docker/machine/releases/download/v0.11.0/docker-machine-`uname -s`-`uname -m` >/tmp/docker-machine &&
    chmod +x /tmp/docker-machine &&
    sudo mv /tmp/docker-machine /usr/local/bin/docker-machine

curl -L https://github.com/dhiltgen/docker-machine-kvm/releases/download/v0.10.0/docker-machine-driver-kvm-ubuntu16.04 >/tmp/docker-machine-driver-kvm &&
    chmod +x /tmp/docker-machine-driver-kvm &&
    sudo mv /tmp/docker-machine-driver-kvm /usr/local/bin/docker-machine-driver-kvm

# Ubuntu 16.04 +
# echo "deb http://download.virtualbox.org/virtualbox/debian yakkety contrib" | sudo tee -a /etc/apt/sources.list
sudo sh -c 'echo "deb http://download.virtualbox.org/virtualbox/debian yakkety contrib" >> /etc/apt/sources.list'
wget -q https://www.virtualbox.org/download/oracle_vbox_2016.asc -O- | sudo apt-key add -
sudo apt-get update
sudo apt-get install -y virtualbox-5.1
sudo apt-get install -y dkms


