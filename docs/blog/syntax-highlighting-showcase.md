# Syntax Highlighting Showcase

This post demonstrates the full range of syntax highlighting for Python, SQL, and Bash code blocks using your current theme.

---

## Python Example
```python
# Python: Data cleaning and plotting
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def clean_data(df):
    df = df.dropna()
    df['value'] = df['value'].astype(float)
    return df[df['value'] > 0]

class DataPlotter:
    def __init__(self, df):
        self.df = df
    def plot(self):
        plt.plot(self.df['date'], self.df['value'], label='Value')
        plt.xlabel('Date')
        plt.ylabel('Value')
        plt.title('Data Over Time')
        plt.legend()
        plt.show()

if __name__ == '__main__':
    df = pd.DataFrame({'date': pd.date_range('2023-01-01', periods=5), 'value': [1, 2, np.nan, 4, 5]})
    df = clean_data(df)
    plotter = DataPlotter(df)
    plotter.plot()
```

---

## SQL Example
```sql
-- SQL: Create, insert, and query
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email) VALUES ('alice', 'alice@example.com');
INSERT INTO users (username, email) VALUES ('bob', 'bob@example.com');

SELECT id, username, email
FROM users
WHERE email LIKE '%@example.com%'
ORDER BY created_at DESC;
```

---

## Bash Example
```bash
# Bash: Data backup script
#!/bin/bash
set -euo pipefail

SRC_DIR="/home/user/data"
BACKUP_DIR="/mnt/backup"
DATE=$(date +%Y-%m-%d)

mkdir -p "$BACKUP_DIR/$DATE"
cp -av "$SRC_DIR"/* "$BACKUP_DIR/$DATE/"
echo "Backup completed for $DATE"
```

---

Enjoy the colors!
