**The Pipeline concept**

Each tool is small and does one thing. Chaining them together creates powerful workflows without writing custom code. That's the Unix philosophy.

**A real-world chain example:**
```bash
curl https://api.example.com/logs \
  | jq '.logs[].message' \
  | grep "timeout" \
  | claude "why are these timeouts happening?"
```

1. `curl` — fetches data from a server
2. `jq` — extracts just the message fields from the JSON
3. `grep` — keeps only timeout-related messages
4. `claude` — analyzes the filtered result

