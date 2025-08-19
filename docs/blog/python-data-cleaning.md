# Python Data Cleaning Tricks

Cleaning data is a crucial step in any analytics workflow. Here are some Python tips for effective data cleaning using pandas:

## Remove Nulls
```python
df = df.dropna()
```

## Standardize Text
```python
df['city'] = df['city'].str.lower().str.strip()
```

## Convert Data Types
```python
df['date'] = pd.to_datetime(df['date'])
```

<!-- More tricks... -->
