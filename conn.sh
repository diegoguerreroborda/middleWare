#!/bin/bash
watch -n 0.5 "(date '+DATE:%H:%M:%S'; echo '3000' ; curl 192.168.1.81:3000/; curl 192.168.1.77:3000) >> log.txt"