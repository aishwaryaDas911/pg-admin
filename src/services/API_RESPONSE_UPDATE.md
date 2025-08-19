# Program Manager API Response Structure Update

## 🔧 **Updated to Handle Actual API Response**

Based on the actual API response from `http://192.168.12.7:9086/merchant-entity-service/programmanager/processSearchProgramManager`

### 📝 **Actual API Response Structure**
```json
{
    "errorCode": "0",
    "errorMessage": "SUCCESS", 
    "totalNoOfRows": 20,
    "programManagersList": [
        {
            "id": 38,
            "status": "Active",
            "businessName": "test",
            "programManagerName": "ashiqfrewsgfr", 
            "companyName": "girmitiewfewf",
            "contactName": null,
            "contactPhone": null,
            "contactEmail": null,
            "accountCurrency": "AUD",
            // ... other fields
        }
    ]
}
```

## 🎯 **Updated Table Structure**

### **New Table Headers (5 columns)**
1. **Program Manager Name** → `programManagerName`
2. **Company Name** → `companyName` 
3. **Business Entity Name** → `businessName`
4. **Status** → `status`
5. **Actions** → (View/Edit/Delete buttons)

### **Removed Previous Columns**
- ❌ Contact Person (`contactPerson`)
- ❌ Phone (`phoneNumber`) 
- ❌ Email (`emailId`)
- ❌ Associated Bank Names (`associatedBankNames`)

## 🔧 **Service Updates**

### **Enhanced Response Parsing**
```typescript
// Primary handling for actual API format
if (responseData.errorCode === "0" && responseData.errorMessage === "SUCCESS") {
  return {
    success: true,
    data: responseData.programManagersList || [],
    totalRecords: responseData.totalNoOfRows || 0,
    currentPage: 1,
    totalPages: Math.ceil(totalNoOfRows / recordsPerPage),
    message: responseData.errorMessage
  };
}
```

### **Status Badge Updates**
Updated to handle actual status values from API:
- ✅ **"Active"** → Green badge
- ❌ **"Inactive"** → Red badge  
- ⏳ **"Pending"** → Yellow badge
- ❓ **Other/Unknown** → Gray badge

## 🎨 **UI Updates**

### **Table Structure**
- **Columns**: Reduced from 8 to 5 columns
- **ColSpan**: Updated loading and empty states to `colSpan={5}`
- **Field Mapping**: Direct mapping to API response fields

### **Data Binding**
```tsx
<TableRow key={row.id || index}>
  <TableCell>{row.programManagerName || '-'}</TableCell>
  <TableCell>{row.companyName || '-'}</TableCell>
  <TableCell>{row.businessName || '-'}</TableCell>
  <TableCell>
    <Badge variant={row.status === 'Active' ? 'default' : 'secondary'}>
      {row.status || 'Unknown'}
    </Badge>
  </TableCell>
  <TableCell>{/* Action buttons */}</TableCell>
</TableRow>
```

## 🧪 **Testing Scenarios**

### **Success Response**
```json
{
  "errorCode": "0",
  "errorMessage": "SUCCESS",
  "totalNoOfRows": 5,
  "programManagersList": [...]
}
```
**Expected**: Table shows 5 records with correct field mapping

### **Empty Response** 
```json
{
  "errorCode": "0", 
  "errorMessage": "SUCCESS",
  "totalNoOfRows": 0,
  "programManagersList": []
}
```
**Expected**: "No records found" message

### **Error Response**
```json
{
  "errorCode": "500",
  "errorMessage": "Internal Server Error",
  "programManagersList": null
}
```
**Expected**: Falls back to mock data with error message

## 🔍 **Debug Information**

Console will show:
```
📦 Full API Response: {errorCode: "0", errorMessage: "SUCCESS", ...}
✅ API Response Success - Data received: [...]
📁 Data type: object Is Array: true
📊 Final results array: [5 items]
📊 Results count: 5
```

## ✅ **Verification Checklist**

- ✅ API response correctly parsed (`errorCode: "0"`)
- ✅ `programManagersList` extracted as data array
- ✅ Table shows 5 columns as specified
- ✅ Status badges show correct colors for "Active"/"Inactive"
- ✅ Empty state shows when `programManagersList` is empty
- ✅ Loading state displays during API call
- ✅ Action buttons functional in each row

## 🎯 **Expected Results**

**Before Update:**
- ❌ Table might not show data due to structure mismatch
- ❌ Wrong column headers and field mapping
- ❌ Status badges using wrong values

**After Update:**
- ✅ Table displays API data correctly
- ✅ Correct 5-column structure matches requirements
- ✅ Status badges reflect actual API status values
- ✅ Proper handling of success/error responses

The table should now correctly display the Program Manager data from your API! 🎉
