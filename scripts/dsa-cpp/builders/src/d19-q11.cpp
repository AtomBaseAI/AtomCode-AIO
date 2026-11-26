#include <bits/stdc++.h>
using namespace std;

long long tiling_ways(long long n) {
    std::vector<long long> dp(n + 2);
    dp[1] = 1;
    if (n >= 2) dp[2] = 2;
    for (long long i = 3; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}

int main() {
    long long n;
    cin >> n;
    cout << tiling_ways(n) << "\n";
    return 0;
}
