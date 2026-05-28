# 📝 Nmap Scan Notes

## 📖 Scenario

Perform a penetration test to scan the Windows 10 target (`192.168.1.6`) from a Kali Linux machine (`192.168.1.12`)  
to identify the following:

- Operating System (OS)
- Open ports
- Protocols in use
- Versions of running services

---

## 🎯 Objective

- Conduct a full TCP port scan
- Perform OS fingerprinting
- Identify service versions
- Capture results and screenshots

---

## 🛠️ Correct Nmap Commands

### ✅ Commands Used:

```bash
nmap -A 192.168.1.6
nmap -sV -O 192.168.1.6 -p-
```
# 🧠 Why These Commands?

| Command | Purpose |
|:--------|:--------|
| `-A` | Enable OS detection, version detection, script scanning, and traceroute |
| `-sV` | Service version detection |
| `-O` | OS detection |
| `-p-` | Scan all 65535 TCP ports |

# ❌ Commands NOT Selected (and Why)

| Command | Issue |
|:--------|:------|
| `nmap -sS -O 192.168.1.6` | SYN scan + OS detection only — missing service version information |
| `192.168.1.10 nmap -sS -O 192.168.1.6` | Incorrect syntax — IP address wrongly placed at start |
| `192.168.1.12 nmap -p -O` | Broken command syntax — missing IP target and improper options |

# 📋 Scan Results Summary (Based on Output)

| Category | Details |
|:---------|:--------|
| OS Detected | Windows 10 Professional |
| Open Ports Found | 80/tcp (HTTP), 135/tcp (Microsoft RPC), 445/tcp (SMB) |
| Notable Services | IIS Web Server, Microsoft RPC, SMBv2 |

_(Details taken from `nmap-scan-results.txt`)_

# 🛠️ Nmap Command Cheat Sheet

| Option | Meaning | Quick Usage Tip |
|:-------|:--------|:----------------|
| `-A` | Enable OS detection, version detection, script scanning, and traceroute | Best for comprehensive scans when you have permission. |
| `-sV` | Detect service versions | Useful for identifying outdated or vulnerable services. |
| `-O` | Enable OS detection | Helps estimate the operating system based on network behavior. |
| `-p-` | Scan all 65535 ports | Always use `-p-` if you want a full port scan (not just top 1000). |
| `-sS` | SYN scan (Stealth scan) | Faster and stealthier; good for avoiding basic firewalls. |
| `-Pn` | No ping (skip host discovery) | Use when host might block ICMP (ping) requests. |
| `-T4` | Increase scan speed | Use for faster scans if network is stable (careful: more noise). |
| `-v` | Verbose output | See detailed progress and more info during scan. |
| `-oN` | Output normal scan results to file | Example: `-oN output.txt` saves readable results. |

# 🧠 Analysis

Based on the results from the Nmap scans:

- **TCP SYN and Full TCP scans** revealed that all ports were filtered, indicating that the target host is likely protected by a firewall or strict access control lists (ACLs).
- **UDP Top 200 scan** resulted in all ports responding as "open|filtered," which is common behavior for UDP scans when ICMP unreachable messages are blocked or rate-limited.
- **OS detection was inconclusive** due to the lack of open and closed port responses required for accurate fingerprinting. However, several aggressive guesses pointed toward older Windows operating systems (e.g., Windows 2000, Windows Server 2003).
- **No open services were identified**, making it difficult to further enumerate or exploit without deeper techniques (e.g., social engineering, physical access, or using other reconnaissance methods).

## 📌 Key Takeaways

- The host employs **strong network filtering** practices, reducing its exposed attack surface.
- In real-world scenarios, penetration testers should **pivot to alternate reconnaissance methods** when faced with highly filtered hosts (e.g., banner grabbing, DNS enumeration, or phishing campaigns).
- **Documentation is still critical** even when no major vulnerabilities are discovered, as identifying hardening measures is part of a professional assessment.

