# Data Pipeline Patterns

In this post, I'll discuss some common data pipeline patterns using Python and SQL.

## Example: Python ETL Script

```python
import pandas as pd

def extract():
    # ...
    pass

def transform(df):
    # ...
    return df

def load(df):
    # ...
    pass

if __name__ == "__main__":
    df = extract()
    df = transform(df)
    load(df)
```

## Example: SQL Window Function

```sql
SELECT user_id, event_time,
       ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY event_time) AS rn
FROM events;
```

---

Stay tuned for more posts!
