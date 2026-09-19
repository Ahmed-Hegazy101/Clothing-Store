import re

with open(r'c:\Users\abohe\Desktop\Clothing Store\js\main.js', encoding='utf-8') as f:
    code = f.read()

# Verify matching brackets
stack = []
pairs = {')': '(', ']': '[', '}': '{'}
in_str = False
str_char = ''
escaped = False

for idx, ch in enumerate(code):
    if in_str:
        if escaped:
            escaped = False
        elif ch == '\\':
            escaped = True
        elif ch == str_char:
            in_str = False
    else:
        if ch in ('"', "'", '`'):
            in_str = True
            str_char = ch
        elif ch in ('(', '[', '{'):
            stack.append((ch, idx))
        elif ch in (')', ']', '}'):
            if not stack:
                print('Unmatched closing at', idx, ch)
                exit(1)
            expected = pairs[ch]
            last, l_idx = stack.pop()
            if last != expected:
                print(f'Mismatched {ch} at {idx} expected matching for {last} at {l_idx}')
                exit(1)

if stack:
    print('Unclosed open tokens:', len(stack), stack[:5])
    exit(1)
else:
    print('SUCCESS: All brackets, braces, and strings in main.js are perfectly balanced!')
