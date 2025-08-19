# dbt Best Practices for Analytics Engineering

dbt is a powerful tool for transforming data in the warehouse. Here are some best practices:

## Use Sources and Seeds
Define your raw data as sources and use seeds for static data.

## Modularize Models
Break transformations into small, reusable models.

## Test Everything
```sql
-- Example dbt test
SELECT * FROM {{ ref('my_model') }} WHERE id IS NULL
```

## Document Your Models
Use dbt's built-in documentation features.
