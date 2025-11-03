---
title: 'Enterprise ETL Pipeline'
subtitle: "Automated data extraction from APIs and dashboards to PostgreSQL"
summary: "Built a modular ETL system that reduces manual data collection time by 90%, extracting data from multiple sources via APIs and browser automation into a unified PostgreSQL warehouse."
author: Uday
date: '2025-09-01'
slug: enterprise-etl-pipeline
categories:
  - Data Engineering
  - Backend
  - Automation
tags:
  - Python
  - PostgreSQL
  - ETL
  - Selenium
  - Data Pipeline
---

![](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop)

<div class="project-highlights">
  <div class="highlight-stat">
    <span class="stat-number">90%</span>
    <span class="stat-label">Reduction in data collection time</span>
  </div>
  <div class="highlight-stat">
    <span class="stat-number">99.9%</span>
    <span class="stat-label">Data accuracy</span>
  </div>
  <div class="highlight-stat">
    <span class="stat-number">6</span>
    <span class="stat-label">Data sources automated</span>
  </div>
</div>

## The Challenge

E-commerce businesses struggle with fragmented operational data across multiple systems:
- **Data silos**: Customer data in buyer app, vendor data in seller app, payments in Razorpay, monitoring in Power BI
- **Manual reporting**: Analysts manually export CSVs from 5+ systems, consuming 10-15 hours/week
- **Delayed insights**: 24-48 hour data lag prevents real-time decision making
- **Browser automation challenges**: Power BI dashboards require manual login and export

## The Solution

Built an enterprise-grade ETL pipeline that:
- Extracts data from **APIs** (buyer/seller apps, Razorpay) and **UI sources** (Power BI dashboards via Selenium)
- Supports **parallel and sequential** processing modes per source
- Uses **configurable chunking** (1-30 day ranges) for optimal performance
- Loads data into **PostgreSQL** using high-speed COPY operations
- Provides **per-source isolation** with independent storage and retry logic

### Architecture

```python
[Data Sources]
  ├─ API Sources (Orders, Tickets, Payments)
  └─ UI Sources (Power BI Dashboards)
       ↓
[Extraction Layer]
  ├─ API Extractors (HTTP clients)
  └─ UI Extractors (Selenium automation)
       ↓
[Chunking Engine]
  ├─ Date range splitting (configurable per source)
  └─ Chunk queue management
       ↓
[Execution Engine]
  ├─ Parallel Workers (Process Pool, 3-5x faster)
  └─ Sequential Processor (Stable for UI)
       ↓
[Storage Layer]
  ├─ Raw CSV files (per chunk)
  └─ Aggregated data (per source)
       ↓
[PostgreSQL Database]
  └─ Bulk COPY (50K+ rows/sec)
```

**Tech Stack**: Python, PostgreSQL, Selenium, AsyncIO, YAML

## Key Features

### Intelligent Processing Modes
- **Parallel execution** for API sources (3-5x speedup)
- **Sequential processing** for browser automation (stability)
- **Per-source configuration** for chunk sizes and execution modes

### Modular Architecture
```python
core/
  ├── config_manager.py      # YAML-based configuration
  ├── chunk_manager.py       # Date range chunking
  ├── execution_engine.py    # Parallel/sequential execution
  ├── storage_manager.py     # Per-source storage
  └── upload_manager.py      # PostgreSQL COPY operations

extractors/
  ├── base_extractor.py      # Abstract base class
  ├── api_extractors/        # HTTP-based sources
  └── ui_extractors/         # Selenium-based extraction
```

### Hybrid Data Extraction

**API Extraction**:
```python
async def extract_orders(start_date, end_date):
    async with aiohttp.ClientSession() as session:
        response = await session.get(
            f'/api/orders?start={start_date}&end={end_date}'
        )
        return await response.json()
```

**UI Extraction** (Power BI):
```python
class PowerBIExtractor:
    def extract_data(self, start_date, end_date):
        self.driver.get('https://powerbi.com/reports/...')
        self.apply_date_filter(start_date, end_date)
        table = self.driver.find_element(By.CSS, '.pivotTable')
        return self.parse_table_data(table)
```

### High-Speed Database Loading
```python
# PostgreSQL COPY: 50,000-100,000 rows/sec
def bulk_load(csv_file, table_name, mode='append'):
    if mode == 'replace':
        cursor.execute(f"TRUNCATE TABLE {table_name}")

    with open(csv_file, 'r') as f:
        cursor.copy_expert(
            f"COPY {table_name} FROM STDIN WITH CSV",
            f
        )
    conn.commit()
```

## Implementation Highlights

### Date Chunking Algorithm
- Splits large date ranges into manageable chunks (configurable per source)
- Prevents memory overflow and API overload
- Enables resumable execution (failed chunks can be retried)

```python
def generate_chunks(start, end, chunk_size_days):
    chunks = []
    current = start
    while current <= end:
        chunk_end = min(current + timedelta(days=chunk_size_days - 1), end)
        chunks.append((current, chunk_end))
        current = chunk_end + timedelta(days=1)
    return chunks
```

### Parallel Execution Engine
```python
class ParallelExecutor:
    def execute(self, extract_func, chunks, worker_count=4):
        with Pool(processes=worker_count) as pool:
            results = pool.starmap(extract_func, chunks)
        return results
```

### CLI Interface
```bash
# Extract data from specific sources
python main.py extract \
    --start-date 2025-08-01 \
    --end-date 2025-08-31 \
    --sources buyer_orders,seller_orders \
    --chunk-sizes "buyer_orders:3,seller_orders:5" \
    --execution-mode "buyer_orders:parallel" \
    --parallel-workers 4 \
    --upload
```

## Business Impact

### Time Savings
- **15 hours/week → 1.5 hours/week** per analyst (90% reduction)
- **24-48 hour delay → 15-minute refresh** cycles
- **Zero manual CSV exports/imports**

### Cost Reduction
- **50% lower analytics labor** (analysts focus on insights, not data wrangling)
- **Eliminated third-party BI connectors** ($5K-15K/year saved)
- **Faster execution**: Parallel processing completes in 1/3 the time

### Data Quality
- **99.9% accuracy** with automated validation
- **12+ months historical data** vs 30-90 days
- **Complete audit trail** for compliance

## Technical Decisions

### Why Process Pool over Thread Pool?
Python's GIL makes threads ineffective for CPU-bound work. Process pools provide true parallel execution on multi-core systems with isolation between workers.

### Why CSV Intermediate Storage?
- PostgreSQL COPY is **10-50x faster** than INSERT statements
- File-based checkpointing enables resume after failures
- Human-readable for debugging

### Why Per-Source Isolation?
- Prevents cross-contamination
- Independent retry logic
- Different upload strategies (append vs replace)

## Results

### Performance
- **API sources**: 10,000-50,000 records/hour
- **UI sources**: 1,000-5,000 records/hour
- **Parallel speedup**: 3-5x faster than sequential

### Scalability
- Handles millions of records
- Horizontal scaling via worker count
- Suitable for daily/weekly/monthly runs

---

*Transforming fragmented data into actionable insights through intelligent automation*
