#include <bits/stdc++.h>
using namespace std;

long long max_loot(const std::vector<long long>& val) {
    int n = (int)val.size();
    std::vector<long long> dp(n);
    dp[0] = val[0];
    if (n >= 2) dp[1] = val[0] > val[1] ? val[0] : val[1];
    for (int i = 2; i < n; i++) {
        long long skip = dp[i - 1];
        long long take = dp[i - 2] + val[i];
        dp[i] = take > skip ? take : skip;
    }
    return dp[n - 1];
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> val(n);
    for (auto& x : val) cin >> x;
    cout << max_loot(val) << "\n";
    return 0;
}
