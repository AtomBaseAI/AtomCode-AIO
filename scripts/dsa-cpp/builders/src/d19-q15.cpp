#include <bits/stdc++.h>
using namespace std;

int min_jumps(const std::vector<long long>& arr) {
    int n = (int)arr.size();
    std::vector<int> dp(n, -1);
    dp[0] = 0;
    for (int i = 1; i < n; i++)
        for (int j = 0; j < i; j++)
            if (dp[j] != -1 && j + arr[j] >= i) {
                if (dp[i] == -1 || dp[j] + 1 < dp[i]) dp[i] = dp[j] + 1;
            }
    return dp[n - 1];
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> arr(n);
    for (auto& x : arr) cin >> x;
    cout << min_jumps(arr) << "\n";
    return 0;
}
