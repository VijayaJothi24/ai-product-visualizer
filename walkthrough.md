

# Walkthrough - Run App.tsx

I have added the standard open-source license header to [App.tsx](file:///c:/ai-product-visualizer/src/App.tsx).

## Changes Made

### 1. License Header Added to [App.tsx](file:///c:/ai-product-visualizer/src/App.tsx)
The standard Apache-2.0 copyright header block comment was prepended to the top of the file:

```diff
+/*
+ * Copyright (c) 2026 MyCompany LLC
+ *
+ * Licensed under the Apache License, Version 2.0 (the "License");
+ * you may not use this file except in compliance with the License.
+ * You may obtain a copy of the License at
+ *
+ *     http://www.apache.org/licenses/LICENSE-2.0
+ *
+ * Unless required by applicable law or agreed to in writing, software
+ * distributed under the License is distributed on an "AS IS" BASIS,
+ * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
+ * See the License for the specific language governing permissions and
+ * limitations under the License.
+ */
+
 import React, { useState, useRef, useEffect } from "react";
```

## Running the Application

To run the application locally on your machine (since the agent environment terminal cannot spawn processes due to a Windows sandbox restriction), use the following steps:

1. Make sure you have your `GEMINI_API_KEY` set in your environment or in a `.env` file (copied from `.env.example`).
2. Run the development server in your terminal:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to the application:
   ```
   http://localhost:3000
   ```
