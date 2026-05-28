<h1>Wireshark Network Investigations Lab</h1>



<h2>Description</h2>
This lab will test your ability to analyze PCAPs using Wireshark, identify suspicious or malicious activity, and collect important information from observed network traffic. We have designed this exercise to develop your understanding of using Wireshark as an analysis tool, introducing you to different attacks and network activity. We have created 3 PCAPs for you to analyze.<br />


<h2>Languages and Utilities Used</h2>

- <b>Wireshark </b>

<h2>Environments Used </h2>

- <b>Windows 10</b> 

<h2>Program walk-through Links:</h2>

Question 1 - PCAP 1 - Identify the first evidence of host discovery scanning on the network (prior to TCP). What is the IP address and what is the protocol used?

Opening the first PCAP we can immediately see Address Resolution Protocol (ARP) traffic.  Based on the ‘Info’ column we can see that 192.168.56.1 is broadcasting on the network, asking every IP in the subnet (192.168.56.2 to 192.168.56.254) what their associated MAC address is. This is a form of network enumeration that allows an actor to identify online systems within the network when they reply to the ARP request with their MAC address.
![image](https://github.com/user-attachments/assets/c094eb3a-5842-4f5c-bb03-ee1af2aaf707)

Question 2 - PCAP 1 - What IP address is being port-scanned by the malicious IP?

In the question we're told that one system is being port-scanned. Based on this information it is highly likely that the attacker's system is attempting to connect to a target system on a large number of ports. Going to Statistics > Conversations we can see that the source IP 192.168.56.1 (column 1) is connecting to random destination ports (column 4) on destination IP 192.168.56.111 (column 3), where each of these conversations is two packets long (column 5). This is clear evidence of port scanning where the target is 192.168.56.111.
![image](https://github.com/user-attachments/assets/430fad7d-5af2-4dbf-8611-16fef64e22dc)

Question 3 - PCAP 1 - Take a closer look at some of the packets associated with FTP traffic. How many users are allowed to connect to the FTP server at once?

Filtering on FTP traffic only using the filter “FTP” we can see a few response packets that provide informational text to the requesting client. Clicking on one we can see in the bottom pane there is text that mentions how many users can have active sessions at once.

![image](https://github.com/user-attachments/assets/3ca29d2d-2b2f-4652-ba6c-43cb010472c0)

Question 4 - PCAP 1 - The attacker tries to log into the FTP server using the username "anonymous". What incorrect password is supplied?

Keeping our filter just looking at FTP traffic we can see a request is made by 192.168.56.1 to the FTP server running on 192.168.56.111 with the username anonymous. It's important to remember that FTP is an insecure protocol, meaning we can see usernames and passwords in plaintext. We're asked to find the password supplied during this authentication attempt - we can either keep scrolling down the packet list, or we can right-click the highlighted packet and Follow > TCP Stream.

![image](https://github.com/user-attachments/assets/673f668e-8c6e-40c7-adab-b467869778c4)
In the below screenshot we can see that the client provided the server with the user ‘anonymous’ then the password ‘IEUser@’, which resulted in a failed authentication.
![image](https://github.com/user-attachments/assets/474ac2a9-5c1d-4918-af65-f5ad40dbf2d4)

Question 5 - PCAP 1 - Export the robots.txt 404 page from packet 4612 as a HTTP Object and open the text file. What is the version number of Apache running on 192.168.56.111?

We're provided with the packet number, and based on the question we know it's HTTP traffic, so we'll filter using ‘http’ then find packet 4612.
![image](https://github.com/user-attachments/assets/4135b9be-df6b-4057-9018-4c079811414b)
In this packet the system running a web server (192.168.56.111) is sending a 404 page not found response back to the requesting client (192.168.56.1). Using Wireshark we can retrieve the HTML file used to generate the 404 webpage that the client will see. Going to File > Export Objects > HTTP we can see HTML pages captured in the PCAP and export them.

![image](https://github.com/user-attachments/assets/4d426dd5-95a0-40f6-9038-dbfc51f29cdd)



![image](https://github.com/user-attachments/assets/7a1234cd-119f-44b0-9b59-d8808ab32e00)


Looking at the Packet column we can find 4612 and select ‘Save’ then save it our Desktop. Opening the file we can see the web server framework, Apache, and version, 2.4.38.


![image](https://github.com/user-attachments/assets/db974f37-ad18-4cc4-913b-0eca71bd2646)


Question 6 - PCAP 2 - What IP address downloaded the ZIP file?

Moving to PCAP 2 we know that a ZIP file was downloaded, and the most likely protocol is going to be HTTPso we'll go to File > Export Objects > HTTP. Looking at the window we can see there is a ZIP file based on the Content Type column showing ‘application/zip’. If the ZIP didn't show up here, we would go to File > Export Objects, and look at the other options such as SMB, SFTP, etc.


![image](https://github.com/user-attachments/assets/e030b85d-197a-406e-b20a-2c45486fdcbf)

Clicking on the row in the popup will take us to the correct packet within the capture, so we can now close this window and look at the main window. We're looking at the 200 response from the server (source = 192.168.56.1) back to the client that is requesting to download the file (destination = 192.168.56.111).

![image](https://github.com/user-attachments/assets/871650d9-6c45-4eff-8364-7891530e7e38)


To view the entire conversational better we will right-click the packet and select Follow > TCP Stream. We can now see the red section that shows the GET request from the client at 192.168.56.1, and the blue section that shows the OK 200 response from the server at 192.168.56.111, and then the file contents are transferred to the client.

![image](https://github.com/user-attachments/assets/229361c4-5ec5-4516-9f17-0647a63f153d)


Question 7 - PCAP 2 - What is the source port (server) and destination port (client) for the file download?

Continuing on from Q6 we'll select the packet where the server provides a 200 and sends the content of the ZIP to the client (if you've lost the packet go to File > Export > HTTP > click on the ZIP entry to select it, then close the popup window).

![image](https://github.com/user-attachments/assets/f9e2231e-ceef-40dc-a5c3-e0236721aa84)

In the above screenshot we can see within the TCP layer the source (server) and destination port (client).


 Question 8 - What is the filename of the downloaded zip file?

Based on the analysis we've done in the previous 2 questions, we know that filename is cr4ckx0r.zip.

![image](https://github.com/user-attachments/assets/09448f55-dac5-4bac-852f-a134029e2a99)


Question 9 - PCAP 2 - Export the ZIP file and save it to your system. What are the first 5 characters of the MD5 hash value of the ZIP file?

Using File > Export > HTTP, then saving cr4ckx0r.zip to the Desktop we can open a terminal, use bash to get a bash shell, then run md5sum cr4ckx0r.zip to get the hash value.

![image](https://github.com/user-attachments/assets/0f1c26b3-bc61-440f-8a2a-0b4f0f829a33)


Question 10 - PCAP 2 - What is the name of the file inside the ZIP? (without file extension)

We can view the files inside the ZIP by simply double-clicking the ZIP icon which will open it in xarchiver. We can see that the file inside is named ‘hashcat', a popular offensive/auditing tool used to crack hashes and passwords to reveal the plaintext versions.

![image](https://github.com/user-attachments/assets/7d01ffbc-cee2-48bb-9ff6-f8f09524b701)


Question 11 - PCAP 2 - What are the first 5 characters of the MD5 hash value of the file inside the ZIP?

We can extract the file by right-clicking the ZIP icon and selecting ‘Extract Here’ to save it to the Desktop. We'll then open a terminal, type bash, then use md5sum hashcat to get the answer we need.

![image](https://github.com/user-attachments/assets/7c74191e-ec21-4e18-b5da-c0cdfb198236)


Question 12 - PCAP 3 - What IP address is running an FTP server?

Moving to PCAP3, to look only at FTP traffic we'll use the filter ftp to remove any unrelated noise. We're looking for the server's IP address, so we need to pay attention to the Info column to understand what's happening, and then use the Source and Destination columns to get the server IP.

![image](https://github.com/user-attachments/assets/8c2fa7e2-25df-441b-9e73-c090a6b3f873)


In the above screenshot we can see a number of FTP packets containing Response: 220. In the screenshot below we can expand the FTP section and get more information about what the 220 response code means.

![image](https://github.com/user-attachments/assets/0479fe8e-071d-4f68-983c-6005815656d2)


So know we know that this packet represents the FTP server sending a response message to a client that is attempting to initiate a connection. From this information we know that the source IP must be the server, because it is sending responses to requests. The FTP server IP is 192.168.56.118.


Question 13 - PCAP 3 - At what time does the attacker send the first password in a dictionary attack against the FTP server?

Scrolling down the packets with our ftp filter still applied, we'll come across packets that contain ‘PASS’ followed by a value, which represents a password submitted to the server.

![image](https://github.com/user-attachments/assets/2fbfe46d-6810-4efc-b35d-78eabdab65fe)


But, looking at the Time column, we can see the value is 0.46195… - this value is the time elapsed since the first packet was captured. As the question is asking for the time in the format YYYY-MM-DD HH:MM:SS we need to change how this column is formatted. We'll do this by going to View > Time Display Format > Date and Time of Day (first option at the top).

![image](https://github.com/user-attachments/assets/a6b92b54-9288-49f9-9578-561198f8258a)

Following the requested format, the answer is 2020-05-26 14:51:19.


Question 14 - PCAP 3 - At what time does the attacker successfully log into the FTP server?

Looking through the Info column, we can see a Response from the server, 230 Login Successful. We can get the answer by looking at the Time column and matching the requested format of YYYY-MM-DD HH:MM:SS.


![image](https://github.com/user-attachments/assets/a3f03103-1e6c-4018-b3fd-249ee268fa7a)


Question 15 - PCAP 3 - What credentials allowed the attacker to log into the FTP server?

We can get the USER and PASS by looking at the packets previous to the 230 Login Successful, reading the Info column, or we can right-click the 230 Login Successful response and go to Follow > TCP Stream.


![image](https://github.com/user-attachments/assets/eefca9f7-8b30-4358-9438-cde6015a8fc1)


Question 16 - PCAP 3 - What is the name of the file downloaded from the FTP server?

The easiest way to see what actions were taken in an FTP session is to right-click a 230 Login Successful response and follow the TCP stream. Completing the same actions as we did for Q15, when we can see everything in the TCP stream window. In the below screenshot you can see the RETR command, an abbreviation for Retrieve, which tells the server to send the requested file to the client. We can see that the user Chris logged in to the server and downloaded password.backup.


![image](https://github.com/user-attachments/assets/798a9b05-2e7c-4213-ac73-cc20326d47a1)


Question 17 - PCAP 3 - At what time does the attacker send the request to download this file from the FTP server?

Looking at the TCP Stream for the 230 Login Successful from the previous questions, we can actually click on the line that references ‘RETR’ which will take us to that packet in the PCAP. We can now close the Stream window and grab the Time value.


![image](https://github.com/user-attachments/assets/06b188a8-c6a0-4957-8745-2c994f8f27f1)
