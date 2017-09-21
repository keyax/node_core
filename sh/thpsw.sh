# sudo groupadd docker

# Ubuntu disabling transparent hugepages
# RedHat Warning: Transparent hugepages looks to be active and should not be.
# Please look at http://bit.ly/1ZAcLjD as for how to PERMANENTLY alter this setting.

cat /sys/kernel/mm/transparent_hugepage/enabled
# [always] madvise never
cat /sys/kernel/mm/transparent_hugepage/defrag
# always defer [madvise] never

sudo bash -c "echo /sys/kernel/mm/transparent_hugepage/enabled = never > /etc/sysfs.conf"

sudo bash -c "echo never > /sys/kernel/mm/transparent_hugepage/enabled"
sudo bash -c "echo never > /sys/kernel/mm/transparent_hugepage/defrag"

sudo cp disable-thp /etc/init.d/disable-thp
sudo chmod 755 /etc/init.d/disable-thp
sudo service disable-thp start
# Failed to start disable-thp.service: Unit disable-thp.service not found.

cat /sys/kernel/mm/transparent_hugepage/enabled
cat /sys/kernel/mm/transparent_hugepage/defrag

# Ubuntu set swappiness 0
# Warning: Swappiness is not set to 0.
# Please look at http://bit.ly/1k2CtNn as for how to PERMANENTLY alter this setting.

sysctl vm.swappiness
cat /etc/sysctl.conf | grep vm.swappiness

if ! (grep -q "vm.swappiness = 0"  /etc/sysctl.conf) then 
    sudo bash -c "echo 'vm.swappiness = 0' >> /etc/sysctl.conf" 
#     exit 1 
     echo "swappiness set to 0"
else
     echo "swappiness yet 0"
fi 

