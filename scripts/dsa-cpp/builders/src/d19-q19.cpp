#include <bits/stdc++.h>
using namespace std;

long long count_subsets(const std::vector<long long>& val, long long target) {
    std::vector<long long> dp(target + 1, 0);
    dp[0] = 1;
    for (long long v : val)
        for (long long t = target; t >= v; t--)
            dp[t] += dp[t - v];
    return dp[target];
}

int main() {
    int n;
    long long target;
    if (!(cin >> n >> target)) return 0;
    vector<long long> val(n);
    for (auto& x : val) cin >> x;
    cout << count_subsets(val, target) << "\n";
    return 0;
}
