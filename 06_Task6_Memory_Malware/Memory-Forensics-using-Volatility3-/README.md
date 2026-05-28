# Memory-Forensics-using-Volatility3-
I will use Volatility3 to analyze MemLabs/Lab 1 Memory Dump Beginner's Luck Challenge

This write-up documents how I analyzed [MemLabs Lab 1 - Beginner's Luck](https://github.com/stuxnet999/MemLabs/tree/master/Lab%201) on my homelab running Kali Linux.

###  Challenge Description
My sister's computer crashed. We were very fortunate to recover this memory dump. Your job is getting all her important files from the system. From what we remember, we suddenly saw a black window pop up with something being executed. When the crash happened, she was trying to draw something. Thats all we remember from the time of crash.



### Download and Unzip the MemoryDump
Download the [memory dump](https://mega.nz/#!6l4BhKIb!l8ATZoliB_ULlvlkESwkPiXAETJEF7p91Gf9CWuQI70) from [here](https://mega.nz/#!6l4BhKIb!l8ATZoliB_ULlvlkESwkPiXAETJEF7p91Gf9CWuQI70)

Download and unzip the file as per the below screenshots:

📸 [download memlab1 zipped file](https://github.com/Jones-Waka/Volatility/blob/screenshots/INSTALL%20SYSTEM%20DEPENDENCIES.JPG))

📸 [unzip the memlab1 file using 7za](https://github.com/Jones-Waka/Volatility/blob/screenshots/INSTALL%20SYSTEM%20DEPENDENCIES.JPG))

📸 [unzipped memlab raw file](https://github.com/Jones-Waka/Volatility/blob/screenshots/INSTALL%20SYSTEM%20DEPENDENCIES.JPG))


### Extracting Windows Info
Since am using Volatility3 no need to identify OS Profile, however you can use the below command if you are using Volatility2 run the below command:
(sudo python3 vol.py -f /home/kali/Downloads/MemoryDump_Lab1.raw imageinfo)


```bash
sudo python3 vol.py -f /home/kali/Downloads/MemoryDump_Lab1.raw windows.info
```

📸 [windows info](https://github.com/Jones-Waka/Volatility))

---

###  Checking Running Processes when the memory dump was extracted
A SOC analyst should be familiar with normal window processes in order to identify any strange processes. Volatility has various plugins that can be used to extract running processes when the memory dump was generated.

Allow me to share output for the three plugins:

```bash
sudo python3 vol.py -f /home/kali/Downloads/MemoryDump_Lab1.raw windows.pslist
```
📸 [pslist](https://github.com/Jones-Waka/Volatility/blob): PsList : is faster and more accurate for identifying active, linked processes but can miss hidden or terminated processes.
```bash
sudo python3 vol.py -f /home/kali/Downloads/MemoryDump_Lab1.raw windows.pstree
```
📸 [pstree](https://github.com/Jones-Waka/Volatility/blob):Pstree: Takes the output from pslist and organizes it in a tree-like format to clearly display parent-child relationships among processes.
```bash
sudo python3 vol.py -f /home/kali/Downloads/MemoryDump_Lab1.raw windows.psscan
```
📸 [psscan](https://github.com/Jones-Waka/Volatility/blob):PsScan : is more thorough and can detect hidden or terminated processes, but it may include false positives and is slower.


  The processes that standout:
 
 - WinRAR.exe  - (PID :1512) 
 
-  cmd.exe     - (PID : 1984)
 
-  mspaint.exe - (PID: 2424)
 
-  Dumpit.exe  - (PID: 796)

📸 [SUSPICIOUS FILES USING PSTREE](https://github.com/Jones-Waka/Volatility/blob/)

- cmd.exe     - (PID : 1984) - no suspicious activity so far.

- mspaint.exe - (PID: 2424) - from the case given, when the crash happened, she was trying to draw something. It is likely she was using Paint program on Windows.

- Dumpit.exe  - (PID: 796) - there is a probability this was the program used to capture the memory dump.

- WinRAR.exe  - (PID :1512) - using the pstree, to visualize parent-child relationship, the output shows WINRAR.exe was launched with a file called Important.rar

---


##  Reference

[Volatility Foundaton Github Page](https://github.com/volatilityfoundation/volatility/wiki/installation)

[Tryhackme Volatility Module](https://tryhackme.com/room/volatility)

##  GitHub Stats  

![Jones's GitHub Stats](https://github-readme-stats.vercel.app/api?username=Jones-Waka&show_icons=true&theme=radical) 
